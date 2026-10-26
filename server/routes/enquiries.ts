import { Router, Request, Response } from 'express';
import { 
  insertEnquiry, 
  getAllEnquiries, 
  getEnquiryById, 
  updateEnquiryStatus, 
  getEnquiryStats 
} from '../db';

export const enquiriesRouter = Router();

// Simple in-memory rate limiting to prevent spam
const ipRequestHistory = new Map<string, number[]>();

function checkRateLimit(ip: string, limit: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now();
  const timestamps = (ipRequestHistory.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= limit) {
    return false;
  }
  timestamps.push(now);
  ipRequestHistory.set(ip, timestamps);
  return true;
}

/**
 * POST /api/enquiries - Submit a new enquiry
 */
enquiriesRouter.post('/', (req: Request, res: Response) => {
  const clientIp = req.headers['x-forwarded-for']?.toString() || req.socket.remoteAddress || 'unknown';

  if (!checkRateLimit(clientIp, 6, 60000)) {
    return res.status(429).json({
      success: false,
      error: 'Too many submissions from your connection. Please wait a minute before submitting again.',
    });
  }

  const {
    fullName,
    businessName,
    email,
    phone,
    service,
    budget,
    projectDescription,
    preferredContact,
    consent,
  } = req.body;

  // Validation
  const errors: Record<string, string> = {};

  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    errors.fullName = 'Full name is required.';
  } else if (fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  const trimmedEmail = email && typeof email === 'string' ? email.trim() : '';
  const trimmedPhone = phone && typeof phone === 'string' ? phone.trim() : '';

  if (!trimmedEmail && !trimmedPhone) {
    errors.contact = 'Please provide either an email address or phone/WhatsApp number.';
  }

  if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Please provide a valid email format (e.g. name@company.com).';
  }

  if (trimmedPhone && trimmedPhone.replace(/[^0-9]/g, '').length < 8) {
    errors.phone = 'Please provide a valid phone number (at least 8 digits).';
  }

  if (!service || typeof service !== 'string' || !service.trim()) {
    errors.service = 'Service selection is required.';
  }

  if (!projectDescription || typeof projectDescription !== 'string' || projectDescription.trim().length < 10) {
    errors.projectDescription = 'Project description must be at least 10 characters.';
  }

  if (consent !== true) {
    errors.consent = 'Consent is required to process your enquiry.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed on submission.',
      errors,
    });
  }

  try {
    const record = insertEnquiry({
      fullName: fullName.trim(),
      businessName: businessName && typeof businessName === 'string' ? businessName.trim() : '',
      email: trimmedEmail,
      phone: trimmedPhone,
      service: service.trim(),
      budget: budget && typeof budget === 'string' ? budget.trim() : '',
      projectDescription: projectDescription.trim(),
      preferredContact: preferredContact && typeof preferredContact === 'string' ? preferredContact.trim() : 'whatsapp',
      consent: true,
      clientIp,
      userAgent: req.headers['user-agent'] || '',
    });

    console.log(`[API] Successfully created enquiry ${record.id} for "${record.fullName}"`);

    return res.status(201).json({
      success: true,
      enquiryId: record.id,
      message: 'Your project enquiry has been securely received by RealTech in Puducherry. Our team will review your requirements and reach out within 24 business hours.',
      enquiry: {
        id: record.id,
        fullName: record.fullName,
        service: record.service,
        createdAt: record.createdAt,
      },
    });
  } catch (err) {
    console.error('[API] Error inserting enquiry:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal server error while saving enquiry. Please try again or reach out directly.',
    });
  }
});

/**
 * GET /api/enquiries - Retrieve enquiries
 */
enquiriesRouter.get('/', (req: Request, res: Response) => {
  const adminKey = req.headers['x-admin-key'] || req.query.key;
  const configuredKey = process.env.ADMIN_KEY || 'realtech-admin-dev';

  // Basic authorization protect for listing records
  if (adminKey !== configuredKey && process.env.NODE_ENV === 'production') {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized. Valid x-admin-key header required to inspect enquiry records.',
    });
  }

  const { status, limit } = req.query;
  let records = getAllEnquiries();

  if (status && typeof status === 'string') {
    records = records.filter((r) => r.status === status);
  }

  if (limit && !isNaN(Number(limit))) {
    records = records.slice(0, Number(limit));
  }

  return res.json({
    success: true,
    count: records.length,
    enquiries: records,
  });
});

/**
 * GET /api/enquiries/stats - Summary statistics
 */
enquiriesRouter.get('/stats', (req: Request, res: Response) => {
  const stats = getEnquiryStats();
  return res.json({
    success: true,
    stats,
  });
});

/**
 * GET /api/enquiries/:id - Get single enquiry
 */
enquiriesRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const record = getEnquiryById(id);

  if (!record) {
    return res.status(404).json({
      success: false,
      error: `Enquiry with ID "${id}" was not found.`,
    });
  }

  return res.json({
    success: true,
    enquiry: record,
  });
});

/**
 * PATCH /api/enquiries/:id/status - Update enquiry status
 */
enquiriesRouter.patch('/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const validStatuses = ['received', 'contacted', 'in_discussion', 'converted', 'archived'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
    });
  }

  const updated = updateEnquiryStatus(id, status, notes);
  if (!updated) {
    return res.status(404).json({
      success: false,
      error: `Enquiry with ID "${id}" was not found.`,
    });
  }

  return res.json({
    success: true,
    message: `Enquiry ${id} updated to status "${status}".`,
    enquiry: updated,
  });
});

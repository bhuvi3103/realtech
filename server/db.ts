import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface EnquiryRecord {
  id: string; // e.g., RT-2026-8941
  fullName: string;
  businessName?: string;
  email?: string;
  phone?: string;
  service: string;
  budget?: string;
  projectDescription: string;
  preferredContact?: string;
  consent: boolean;
  status: 'received' | 'contacted' | 'in_discussion' | 'converted' | 'archived';
  clientIp?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'enquiries.json');
const LOG_FILE = path.join(DATA_DIR, 'enquiries.log');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialise DB file if missing
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
}

/**
 * Generate a friendly professional reference code: RT-2026-XXXX
 */
export function generateReferenceId(): string {
  const year = new Date().getFullYear();
  const rand = crypto.randomInt(1000, 9999);
  return `RT-${year}-${rand}`;
}

/**
 * Read all enquiries from disk
 */
export function getAllEnquiries(): EnquiryRecord[] {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[DB] Error reading database file:', err);
    return [];
  }
}

/**
 * Atomically save enquiries to disk
 */
function saveAllEnquiries(records: EnquiryRecord[]): void {
  const tmpFile = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tmpFile, JSON.stringify(records, null, 2), 'utf-8');
  fs.renameSync(tmpFile, DB_FILE);
}

/**
 * Append to append-only audit log
 */
function appendAuditLog(message: string): void {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(LOG_FILE, `[${timestamp}] ${message}\n`, 'utf-8');
}

/**
 * Insert a new enquiry
 */
export function insertEnquiry(data: Omit<EnquiryRecord, 'id' | 'createdAt' | 'updatedAt' | 'status'>): EnquiryRecord {
  const records = getAllEnquiries();
  const now = new Date().toISOString();
  const id = generateReferenceId();

  const record: EnquiryRecord = {
    ...data,
    id,
    status: 'received',
    createdAt: now,
    updatedAt: now,
  };

  records.unshift(record);
  saveAllEnquiries(records);
  appendAuditLog(`NEW_ENQUIRY: ${id} from "${record.fullName}" (${record.email || record.phone || 'No direct contact'}) - Service: ${record.service}`);

  return record;
}

/**
 * Find enquiry by ID
 */
export function getEnquiryById(id: string): EnquiryRecord | undefined {
  const records = getAllEnquiries();
  return records.find((r) => r.id === id);
}

/**
 * Update enquiry status and optional notes
 */
export function updateEnquiryStatus(
  id: string, 
  status: EnquiryRecord['status'], 
  notes?: string
): EnquiryRecord | null {
  const records = getAllEnquiries();
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return null;

  records[idx].status = status;
  records[idx].updatedAt = new Date().toISOString();
  if (notes !== undefined) {
    records[idx].notes = notes;
  }

  saveAllEnquiries(records);
  appendAuditLog(`STATUS_UPDATE: ${id} -> ${status}`);
  return records[idx];
}

/**
 * Get statistical metrics
 */
export function getEnquiryStats() {
  const records = getAllEnquiries();
  const total = records.length;
  const received = records.filter((r) => r.status === 'received').length;
  const contacted = records.filter((r) => r.status === 'contacted').length;
  const inDiscussion = records.filter((r) => r.status === 'in_discussion').length;
  const converted = records.filter((r) => r.status === 'converted').length;

  const byService: Record<string, number> = {};
  for (const r of records) {
    byService[r.service] = (byService[r.service] || 0) + 1;
  }

  return {
    total,
    received,
    contacted,
    inDiscussion,
    converted,
    byService,
    lastEnquiryAt: records.length > 0 ? records[0].createdAt : null,
  };
}

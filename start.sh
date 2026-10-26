#!/usr/bin/env bash
# Quick launcher for RealTech Website & Backend
cd "$(dirname "$0")" || exit 1
echo "Starting RealTech on http://localhost:3001 ..."
npm run start

const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const store = require('../models/store');

/**
 * Storage Service for Sensitive Complaint Evidence
 * Ensures evidence files are never exposed through public static file directories.
 */
const generateEvidenceAccessToken = (evidenceId, userId) => {
  return jwt.sign(
    {
      evidenceId,
      userId,
      purpose: 'evidence_download',
    },
    env.JWT_SECRET,
    { expiresIn: '15m' } // 15-minute expiring access grant
  );
};

const verifyEvidenceAccess = (user, evidenceId) => {
  const evidence = store.evidence.find(e => e.id === evidenceId);
  if (!evidence) {
    const error = new Error('Evidence record not found');
    error.statusCode = 404;
    error.code = 'EVIDENCE_NOT_FOUND';
    throw error;
  }

  const complaint = store.complaints.find(c => c.id === evidence.complaint_id);
  if (!complaint) {
    const error = new Error('Associated complaint not found');
    error.statusCode = 404;
    error.code = 'COMPLAINT_NOT_FOUND';
    throw error;
  }

  // Super admin and auditor can inspect
  if (['super_admin', 'auditor'].includes(user.role)) {
    return { evidence, complaint };
  }

  // Complainant can view if not anonymous or if uploaded by them
  if (complaint.user_id === user.id || evidence.uploaded_by === user.id) {
    return { evidence, complaint };
  }

  // Authorized HR, Counselor, or NGO in the same organization
  if (['hr', 'counselor', 'ngo'].includes(user.role) && complaint.org_id === user.org_id) {
    return { evidence, complaint };
  }

  const error = new Error('Forbidden: You are not authorized to view this confidential evidence');
  error.statusCode = 403;
  error.code = 'EVIDENCE_FORBIDDEN';
  throw error;
};

module.exports = {
  generateEvidenceAccessToken,
  verifyEvidenceAccess,
};

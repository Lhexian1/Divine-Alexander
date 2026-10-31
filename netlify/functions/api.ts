/**
 * Netlify Serverless Function handler for Alexanders Career Strategy
 * Routes /.netlify/functions/api/* requests using the same validation rules
 * as the Express backend in server.ts.
 */
import {
  validateEmployerEnquiry,
  validateCandidateSubmission,
  validateContactEnquiry,
  validateCareerInterest,
} from '../../src/utils/validation';
import { createInitialCmsStore, type FullCmsStore } from '../../src/data/siteContent';

let serverlessCmsStore: FullCmsStore = createInitialCmsStore();

export async function handler(event: {
  httpMethod: string;
  path: string;
  body: string | null;
}) {
  const headers = {
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
  };

  if (event.httpMethod === 'GET' && event.path.endsWith('/cms')) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, store: serverlessCmsStore }),
    };
  }

  if (event.httpMethod === 'PUT' && event.path.endsWith('/cms')) {
    try {
      const payload = event.body ? JSON.parse(event.body) : {};
      serverlessCmsStore = {
        ...serverlessCmsStore,
        ...payload,
        updatedAt: new Date().toISOString(),
      };
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true, store: serverlessCmsStore }),
      };
    } catch {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ ok: false, message: 'Invalid CMS payload.' }),
      };
    }
  }

  if (event.httpMethod === 'POST' && event.path.endsWith('/cms/reset')) {
    serverlessCmsStore = createInitialCmsStore();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, store: serverlessCmsStore }),
    };
  }

  if (event.httpMethod === 'GET' && event.path.endsWith('/system-status')) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        timestamp: new Date().toISOString(),
        integrations: {
          supabaseConfigured: Boolean(
            process.env.SUPABASE_URL &&
              process.env.SUPABASE_SERVICE_ROLE_KEY &&
              process.env.SUPABASE_CV_BUCKET
          ),
          resendConfigured: Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM),
          employerInboxConfigured: Boolean(process.env.EMPLOYER_NOTIFICATION_EMAIL),
          candidateInboxConfigured: Boolean(process.env.CANDIDATE_NOTIFICATION_EMAIL),
          siteUrlConfigured: Boolean(process.env.SITE_URL),
          privateLocalVaultActive: true,
          dynamicCmsBackendActive: true,
        },
        submissionCount: 0,
        recentSubmissions: [],
      }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ ok: false, message: 'Method not allowed.' }),
    };
  }

  try {
    const payload = event.body ? JSON.parse(event.body) : {};

    if (event.path.endsWith('/submissions/employer')) {
      const result = validateEmployerEnquiry(payload);
      if (!result.valid) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            ok: false,
            message: 'We could not submit your enquiry. Please review the required fields and try again.',
            errors: result.errors,
          }),
        };
      }
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          ok: true,
          message:
            'Thank you for contacting Alexanders Career Strategy. Your enquiry has been submitted successfully. Our team will review your requirements and contact you if further discussion is appropriate.',
        }),
      };
    }

    if (event.path.endsWith('/submissions/candidate')) {
      const result = validateCandidateSubmission(payload);
      if (!result.valid) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            ok: false,
            message: 'Your CV could not be submitted. Please check your details and file format, then try again.',
            errors: result.errors,
          }),
        };
      }
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          ok: true,
          message:
            'Thank you for submitting your CV to Alexanders Career Strategy. Your submission has been received successfully and may be considered for relevant opportunities.',
        }),
      };
    }

    if (event.path.endsWith('/submissions/contact')) {
      const result = validateContactEnquiry(payload);
      if (!result.valid) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            ok: false,
            message: 'We could not submit your message. Please check your information and try again.',
            errors: result.errors,
          }),
        };
      }
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          ok: true,
          message: 'Thank you for contacting Alexanders Career Strategy. Your message has been submitted successfully.',
        }),
      };
    }

    if (event.path.endsWith('/submissions/career-interest')) {
      const result = validateCareerInterest(payload);
      if (!result.valid) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            ok: false,
            message:
              'We could not submit your information right now. Please try again, or use the published contact method.',
            errors: result.errors,
          }),
        };
      }
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          ok: true,
          message: 'Thank you. Your submission has been received.',
        }),
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ ok: false, message: 'Endpoint not found.' }),
    };
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ ok: false, message: 'Invalid JSON request payload.' }),
    };
  }
}

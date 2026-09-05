const { CRISIS_HOTLINES } = require('../config/constants');
const { logAuditEvent } = require('../middleware/audit');

// Patterns indicating immediate crisis, self-harm, or severe abuse
const CRISIS_PATTERNS = [
  /suicid/i,
  /kill\s+myself/i,
  /hurt\s+myself/i,
  /end\s+my\s+life/i,
  /want\s+to\s+die/i,
  /cutting\s+myself/i,
  /overdose/i,
  /beating\s+me/i,
  /abuse\s+at\s+home/i,
  /sexual\s+assault/i,
  /molest/i,
];

// Patterns for unsafe or illegal instructions
const UNSAFE_INSTRUCTION_PATTERNS = [
  /how\s+to\s+hack/i,
  /make\s+a\s+bomb/i,
  /buy\s+drugs/i,
  /steal\s+passwords/i,
  /bypass\s+parental\s+control/i,
  /doxx/i,
];

// Patterns inquiring about medical/legal prescriptions
const MEDICAL_LEGAL_PATTERNS = [
  /diagnose\s+me/i,
  /prescribe\s+medicine/i,
  /what\s+pills\s+to\s+take/i,
  /legal\s+contract/i,
  /lawsuit\s+advice/i,
];

const processAIChatMessage = async (userOrNull, message) => {
  if (!message || !message.trim()) {
    const error = new Error('Chat message content is required');
    error.statusCode = 400;
    error.code = 'VALIDATION_ERROR';
    throw error;
  }

  const trimmedMessage = message.trim();

  // 1. CRISIS / IMMEDIATE DANGER DETECTION
  for (const pattern of CRISIS_PATTERNS) {
    if (pattern.test(trimmedMessage)) {
      await logAuditEvent({
        actorId: userOrNull ? userOrNull.id : null,
        action: 'AI_CRISIS_ESCALATION_TRIGGERED',
        resourceType: 'ai_safety',
        details: { category: 'crisis_intervention' },
      });

      return {
        reply: `I care about your safety, but I want to make sure you get the human support you deserve right now. Please reach out immediately to a trusted adult, family member, or professional counselor. You do not have to carry this alone.\n\nImmediate 24/7 Free Support Hotlines:\n• National Childline: 1098\n• National Emergency Services: 112\n• Tele-MANAS Mental Health Support: 14416`,
        is_crisis: true,
        is_refusal: false,
        escalation: {
          requires_immediate_attention: true,
          hotlines: CRISIS_HOTLINES,
          guidance: 'Please speak with a trusted adult, school counselor, or call the toll-free emergency helpline right now.',
        },
        disclaimer: 'TeenTalk AI is an educational guidance assistant and cannot provide medical, clinical, or emergency rescue services.',
      };
    }
  }

  // 2. UNSAFE / HARMFUL INSTRUCTIONS DETECTION
  for (const pattern of UNSAFE_INSTRUCTION_PATTERNS) {
    return {
      reply: "I cannot provide instructions, techniques, or suggestions that could lead to physical harm, digital security breaches, or illegal activities. If you have questions regarding digital defense or staying safe online, I'd be glad to share safety best practices.",
      is_crisis: false,
      is_refusal: true,
      escalation: null,
      disclaimer: 'TeenTalk AI is programmed to uphold student safety and ethical digital standards.',
    };
  }

  // 3. MEDICAL / LEGAL DISCLAIMER
  for (const pattern of MEDICAL_LEGAL_PATTERNS) {
    return {
      reply: "I cannot provide formal medical diagnoses, medication advice, or legal counsel. For medical concerns, please consult a qualified healthcare provider or your school health officer. For legal guidance, please speak with an authorized adult or legal professional.",
      is_crisis: false,
      is_refusal: true,
      escalation: null,
      disclaimer: 'TeenTalk AI is not a licensed physician or attorney.',
    };
  }

  // 4. EDUCATIONAL GUIDANCE RESPONSES (Contextual matching)
  let responseText = '';
  const lowerMsg = trimmedMessage.toLowerCase();

  if (lowerMsg.includes('bully') || lowerMsg.includes('teas')) {
    responseText = `Facing bullying or teasing can feel very isolating, but remember that it is never your fault.\n\nHere are 3 steps you can take:\n1. **Do not retaliate**: Bullies often seek an emotional reaction.\n2. **Save Evidence**: Keep screenshots or notes of dates and times.\n3. **Reach Out**: Confide in a teacher, parent, or use TeenTalk's confidential complaint tool if you attend an enrolled school.\n\nWould you like guidance on building an upstander support circle or how to file a confidential report?`;
  } else if (lowerMsg.includes('stress') || lowerMsg.includes('anxi') || lowerMsg.includes('exam')) {
    responseText = `Exam and academic pressure is something many students experience. Here is a quick grounding exercise you can try right now:\n\n**The 4-4-4 Box Breathing:**\n• Inhale slowly through your nose for 4 seconds\n• Hold your breath gently for 4 seconds\n• Exhale smoothly through your mouth for 4 seconds\n• Rest for 4 seconds, then repeat 3 times.\n\nRemember to break your study schedule into 25-minute focused blocks and take short walks. Would you like to log your feelings in the Mood Tracker?`;
  } else if (lowerMsg.includes('password') || lowerMsg.includes('hacked') || lowerMsg.includes('privacy')) {
    responseText = `Protecting your digital accounts is super important! Here is what you should do immediately:\n\n1. **Change your passwords**: Make them at least 12 characters combining uppercase, lowercase, numbers, and symbols.\n2. **Enable Two-Factor Authentication (2FA)** on all social and gaming apps.\n3. **Review Connected Apps**: Revoke permissions for unknown third-party quizzes or apps.\n\nCheck out our 'Cyber Safety & Social Media Privacy' learning module for a full walkthrough!`;
  } else {
    responseText = `Hello! I am your TeenTalk Safety Companion. I am here to help you learn about online privacy, respectful relationships, managing stress, and navigating school life safely.\n\nHow can I help you today? You can ask me about:\n• How to deal with cyberbullying or peer pressure\n• Keeping your social media accounts safe\n• Healthy personal boundaries and safe touch\n• Mindfulness and stress relief techniques`;
  }

  return {
    reply: responseText,
    is_crisis: false,
    is_refusal: false,
    escalation: null,
    disclaimer: 'TeenTalk AI provides educational peer safety information and does not substitute for licensed counseling or emergency intervention.',
  };
};

module.exports = {
  processAIChatMessage,
};

import Conversation from "../models/Conversation.js";

import {
  getAIResponse
} from "../services/aiService.js";

import generateConversationId from "../utils/generateConversationId.js";

export const chatWithAssistant = async (req, res) => {
  try {

    const { message, conversationId } = req.body;

    // 1. Validate user message

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    // 2. Get or generate conversation ID

    const currentConversationId =
      conversationId || generateConversationId();

    // 3. Find existing conversation

    let conversation = await Conversation.findOne({
      conversationId: currentConversationId
    });

    // 4. Create new conversation if not exists

    if (!conversation) {

      if (conversationId) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found"
        });
      }

      conversation = new Conversation({
        conversationId: currentConversationId,
        messages: []
      });
    }

    // 5. Get previous conversation history

    const previousMessages = conversation.messages.map(
      (msg) => ({
        role: msg.role,
        content: msg.content
      })
    );

    // 6. Get AI response

    const aiResponse = await getAIResponse(
      message.trim(),
      previousMessages
    );

    // 7. Save user message

    conversation.messages.push({
      role: "user",
      content: message.trim()
    });

    // 8. Save assistant response

    conversation.messages.push({
      role: "assistant",
      content: typeof aiResponse === "string"
        ? aiResponse
        : JSON.stringify(aiResponse)
    });

    // 9. Save conversation in MongoDB

    await conversation.save();

    // 10. Return response

    return res.status(200).json({
      success: true,

      conversationId: currentConversationId,

      reply: aiResponse
    });

  } catch (error) {

    console.error("Chat Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};
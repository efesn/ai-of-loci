const generateLoci = async (req, res) => {
  try {
    // Extract data from the request body
    const { model, messages } = req.body;

    // Extract place and task from the messages array
    const { content: task } = messages[0];

    // Assign default values for testing
    const place = "Home";

    // Construct the prompt using the provided template
    const prompt = `I want you to act as a method of loci generator. You will help people to memorize things using the method of loci. Users will provide the thing they want to memorize. Once you have this information, start generation. Use your most efficient way to generate this. Don't keep it too short or too long. Use ${place} as a place. Here is your first task: ${task}`;

    // Create the request body for ChatGPT
    const requestBody = {
      prompt,
      max_tokens: 150,
    };

    // Make a request to the ChatGPT API with dynamic API key
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    console.log("ChatGPT API Response:", response.data); // Add this line for debugging

    // Extract the generated response from the API
    const generatedText = response.data.choices[0]?.message?.content || null;

    console.log("Generated Text:", generatedText); // Add this line for debugging

    // Send the generated response back to the client
    res.status(200).json({
      message: "Method of Loci generated successfully!",
      generatedText,
    });
  } catch (error) {
    console.error("Error in generateLoci:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

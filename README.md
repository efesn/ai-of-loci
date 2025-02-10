# AI Of Loci 🧠
[comment]: <img src="https://github.com/efesn/ai-of-loci/assets/122704426/a6b67f96-805f-4d80-a2db-f4625ae1469c" width="430">

<img src="https://github.com/efesn/ai-of-loci/assets/122704426/a8d05f6e-a925-417a-ad7b-3eafb3e9ba3f" width="200">



__A digital heaven for memory enthusiasts and learners seeking a modern approach to the age-old Method of Loci. At AI Of Loci, we blend ancient wisdom with cutting-edge technology to revolutionize the way you memorize and recall information.__

## Introduction
#####  🎥 *See the demo if domain is currently unreachable*
https://github.com/user-attachments/assets/127e18d8-2316-4a44-8747-aefdcc858062

AI Of Loci is a memorization and learning/studying platform powered by AI. Users can effectively learn information using advanced AI algorithms and an ancient memorization technique known as the "Method of Loci" or "Mind Palace".

The platform assists users in learning and memorizing information by allowing them to input text (and place) related to a specific topic. Users enter detailed text about the subject they want to learn, and AI Of Loci enhances their memorization based on this input and place. For example, when a user enters a topic they want to learn about biology, the platform provides a series of mind palace content containing important concepts related to it in the place you entered.

While you have the option to enter a specific place along with your text to place input, rest assured that AI will intelligently select a place for you if you prefer not to specify one.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Others**: OpenAI API

## Usage

To use AI of Loci locally, follow these steps:

1. Clone the AI of Loci repository to your local machine:

```bash
git clone https://github.com/efesn/ai-of-loci.git
```

2. Navigate to the cloned directory:
```bash
cd ai-of-loci
```

### Backend (API)

1. Navigate to the Backend Directory

```bash
cd api
```

2. Install Dependencies

```bash
npm install
```

3. Create a .env file in the api directory and define the necessary environment variables:

```bash
OPENAI_API_KEY=your openai api key
PORT=3001
ORG=your openai organization key
JWT_SECRET=Recommended value is a 256-bit encryption key.
MONGO=your mongodb connection url
```

4. Run the Backend server

```bash
npm start
```

### Frontend

1. Navigate to the Frontend directory
```bash
cd client
```

2. Install Dependencies

```bash
npm install
```

3. Run the Frontend server

```bash
npm start
```

The frontend development server should now be running locally at http://localhost:3001


## Support

For any questions, issues or feedback, please contact info@aiofloci.com

## License

This project is licensed under the GPLv3 License - see the [LICENSE](LICENSE) file for details.


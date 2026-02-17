# Node.js Plugin for Utilizing DeepL Translation API in GoldenDict/GoldenDict-ng

This Node.js plugin enables seamless integration of DeepL's translation service into GoldenDict/GoldenDict-ng, a cross-platform open-source dictionary application. GoldenDict/GoldenDict-ng can be used on Windows, macOS, and Linux systems, providing a versatile solution for translation needs.

Since the API for free users comes with monthly usage limits, I've added a feature in the plugin that automatically checks the remaining free usage after each translation request, ensuring you're always aware of your usage.

In developing this plugin, I employed various technical approaches to enhance user experience. Firstly, I used regular expressions to determine if the input content is in Chinese. If it is, the content is translated into English; otherwise, it's translated into Chinese. This makes it effortless to translate Chinese into other languages or vice versa.

Furthermore, to protect sensitive information, I stored DeepL's AUTH_KEY in a separate .env file and imported it into my code as an environment variable using the dotenv package, ensuring security and maintainability. I provided an example .env.example file for users to create their own .env file with their DeepL AUTH_KEY. Simply rename .env.example to .env and replace the placeholder with your actual DeepL AUTH_KEY.

To use this plugin in GoldenDict/GoldenDict-ng, you need to install Node.js, git clone or download the files and unzip. Then under the project folder, `npm ci` to install the dependency packages.

In GoldenDict/GoldenDict-ng, press F3 or open Dictionaries settings. Add the following settings in the programs panel, the path will be different depends on where you store the script.

![Screenshot 2024-02-20 154202](https://github.com/DevJogger/GoldenDict-DeepL/assets/158173870/8931c59d-6ea0-4b09-8756-70647ad67ddb)

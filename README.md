# Smart Outfit Recommender

Smart Outfit Recommender is a web extension that offers AI-driven clothing suggestions based on weather, occasion, and user preferences.

## Project Description

The Smart Outfit Recommender addresses the common challenge of selecting suitable clothing by providing intelligent suggestions tailored to the user's environment and needs. By integrating weather data and user preferences, the application ensures that users are dressed appropriately for any occasion.

### APIs Used

- **Chrome built-in AI: Prompt API**: Utilized for generating personalized clothing recommendations based on user input and preferences.


## Features

- **Weather-Specific Suggestions**: Receive outfit ideas tailored to the current weather conditions.
- **Occasion-Based Recommendations**: Get clothing advice suitable for various events.
- **Personalized Preferences**: Include specific preferences or requirements for more customized advice.
- **User-Friendly Interface**: Utilize sliders to adjust parameters like temperature and top-K for AI model tuning.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ssachin520280/smart-outfit-recommender.git
   ```
2. Navigate to the project directory:
   ```bash
   cd smart-outfit-recommender
   ```

## Usage

1. Open `sidepanel/index.html` in your web browser.
2. Choose the weather and occasion from the dropdown menus.
3. Enter any additional preferences in the text area.
4. Adjust the sliders for temperature and top-K as needed.
5. Click "Get Suggestions"

## Demo

Watch the demo video to see the Smart Outfit Recommender in action: [Demo Video](https://youtu.be/RcVWQg1El8E)

## Development

- The project uses a service worker (`background.js`) to manage the side panel behavior.
- The main logic for generating prompts and handling user input is in `sidepanel/index.js`.
- Styling is managed through `sidepanel/index.css`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please contact [ssachin520280@outlook.com](mailto:ssachin520280@outlook.com).

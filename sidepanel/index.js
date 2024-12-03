// DOM Elements
const inputPrompt = document.querySelector('#input-prompt');
const buttonPrompt = document.querySelector('#button-prompt');
const buttonReset = document.querySelector('#button-reset');
const elementResponse = document.querySelector('#response');
const elementLoading = document.querySelector('#loading');
const elementError = document.querySelector('#error');
const sliderTemperature = document.querySelector('#temperature');
const sliderTopK = document.querySelector('#top-k');
const labelTemperature = document.querySelector('#label-temperature');
const labelTopK = document.querySelector('#label-top-k');
const weatherSelect = document.querySelector('#weather');
const occasionSelect = document.querySelector('#occasion');

let session;

async function runPrompt(prompt, params) {
    try {
        if (!session) {
            session = await window.ai.languageModel.create({
                ...params,
                systemPrompt: `You are an expert fashion consultant specializing in personalized outfit recommendations. Your advice must follow these guidelines:

                1. Weather Expertise: Provide temperature-appropriate, practical clothing choices that account for precipitation, wind, and layering needs.
                2. Occasion Appropriateness: Match formality levels, consider social and cultural context, and ensure the outfit meets venue requirements. 
                3. Clothing Specifics: Name exact types of clothing items, specify colors, patterns, fabrics, and suggest relevant brands.
                4. Practical Considerations: Focus on comfort, mobility, whole-day wearability, and coordinated styling.


                Maintain concise, clear, and practical recommendations without any speculation or ambiguity.`
            });
        }
        return session.prompt(prompt);
    } catch (e) {
        console.error('Prompt failed:', e);
        reset();
        throw e;
    }
}

async function reset() {
    if (session) {
        await session.destroy();
    }
    session = null;
    buttonReset.setAttribute('disabled', '');
}

async function initDefaults() {
    if (!window.ai) {
        showError('Error: window.ai not supported in this browser');
        return;
    }
    try {
        const defaults = await window.ai.languageModel.capabilities();
        console.log('Model defaults:', defaults);
        sliderTemperature.value = defaults.temperature;
        sliderTopK.value = defaults.topK;
        labelTopK.textContent = defaults.topK;
        labelTemperature.textContent = defaults.temperature;
    } catch (e) {
        console.error('Failed to get defaults:', e);
        showError('Failed to initialize AI capabilities');
    }
}

function generatePrompt() {
    const weather = weatherSelect.value;
    const occasion = occasionSelect.value;
    const preferences = inputPrompt.value.trim();

    return `
        Help me choose what to wear today.
        Weather: ${weather}
        Occasion: ${occasion}
        ${preferences ? `Additional preferences: ${preferences}` : ''}

        Please provide your response in this exact format:

        1. MAIN OUTFIT
        - Primary pieces (specify color, material, and style for each)
        - Layering pieces (if needed)
        - Footwear selection

        2. ACCESSORIES
        - Required accessories
        - Optional enhancements
        - Weather-specific items

        3. PRACTICAL ADVICE
        - Weather adaptation tips
        - Comfort considerations
        - Style coordination notes
    `.trim();
}

function updateButtonState() {
    const hasRequiredInputs = weatherSelect.value && occasionSelect.value;
    buttonPrompt.disabled = !hasRequiredInputs;
}

// Event Listeners
buttonReset.addEventListener('click', async () => {
    hide(elementLoading);
    hide(elementError);
    hide(elementResponse);
    await reset();
    weatherSelect.value = '';
    occasionSelect.value = '';
    inputPrompt.value = '';
    updateButtonState();
});

sliderTemperature.addEventListener('input', (event) => {
    labelTemperature.textContent = event.target.value;
    reset();
});

sliderTopK.addEventListener('input', (event) => {
    labelTopK.textContent = event.target.value;
    reset();
});

[weatherSelect, occasionSelect, inputPrompt].forEach(element => {
    element.addEventListener('change', updateButtonState);
    element.addEventListener('input', updateButtonState);
});

buttonPrompt.addEventListener('click', async () => {
    const prompt = generatePrompt();
    showLoading();
    try {
        const params = {
            temperature: parseFloat(sliderTemperature.value),
            topK: parseInt(sliderTopK.value)
        };
        const response = await runPrompt(prompt, params);
        showResponse(response);
        buttonReset.removeAttribute('disabled');
    } catch (e) {
        showError(e.message || 'Failed to generate advice');
    }
});

// UI Helper Functions
function showLoading() {
    hide(elementResponse);
    hide(elementError);
    elementLoading.classList.add('visible');
}

function hideLoading() {
    elementLoading.classList.remove('visible');
}

function showResponse(response) {
    hideLoading();
    hide(elementError);
    show(elementResponse);
    
    elementResponse.textContent = '';
    const paragraphs = response.split(/\r?\n/);
    for (const paragraph of paragraphs) {
        if (paragraph) {
            elementResponse.appendChild(document.createTextNode(paragraph));
        }
        elementResponse.appendChild(document.createElement('BR'));
    }
}

function showError(error) {
    hideLoading();
    hide(elementResponse);
    show(elementError);
    elementError.textContent = error;
}

function show(element) {
    element.removeAttribute('hidden');
}

function hide(element) {
    element.setAttribute('hidden', '');
}

// Initialize the extension
initDefaults();
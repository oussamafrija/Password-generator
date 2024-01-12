const lengthSlider = document.querySelector(".password-length input"),
options = document.querySelectorAll(".option input"),
copyIcon = document.querySelector(".input-box span"),
passwordInput = document.querySelector(".input-box input"),
passwordIndicator = document.querySelector(".password-indicator"),
generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "@%&/()=?!#*+-"
}

const generatePassword = () => {
    let staticPassword = "";
    let randomPassword = "";
    let excDuplicate = false;
    let passLength = lengthSlider.value;

    options.forEach(option => {
        if(option.checked){
            if (option.id !== "exc-duplicate" && option.id !=="spaces"){
                staticPassword += characters[option.id];
            }
            else if (option.id === "spaces"){
                staticPassword += ` ${staticPassword} `;
            }
            else{
                excDuplicate = true;
            }
            
        }
    });

    for (let i = 0 ; i < passLength; i++){
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excDuplicate){
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        }
        else{
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;
}

const updatePasswordIndicator = () => {
    passwordIndicator.id = lengthSlider.value <= 14 ? "weak" : lengthSlider.value <= 20 ? "medium" : "strong";
}

const updateSlider = () => {
    // passing Slider value as counter text
    document.querySelector( ".password-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePasswordIndicator ();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
    }, 1500);
}

copyIcon.addEventListener("click", copyPassword)
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
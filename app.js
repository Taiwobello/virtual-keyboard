const keyboard = {
    elements: {
        keys: null,
        container: null,
        keyboard: null,
        keyboardContainer: null,
    },

    properties: {
        value: "",
        capsLock: false
    },

    init(){

        // Disable keyboard
        function disable(){
            document.onkeydown = function(e){
                return false
            }
        }
        disable()
        
        this.elements.container = document.querySelector(".container")
        this.elements.keyboardContainer = document.createElement("div")
        this.elements.keyboardContainer.setAttribute("class", "keyboard-container")
        this.elements.container.classList.add("hidden-keyboard")
        this.elements.keyboard = document.createElement('div')
        this.elements.keyboard.setAttribute("class", "keyboard")
        this.elements.keyboard.appendChild(this.createKeys())
        this.elements.keyboardContainer.appendChild(this.elements.keyboard)
        this.elements.container.appendChild(this.elements.keyboardContainer)

        this.elements.keys = document.querySelectorAll(".keyboard-key")
        // show keyboard
        document.getElementById("keyboard-input").addEventListener("focus", () => {
            this.elements.container.classList.remove("hidden-keyboard")
        })
    },

    textInput(){
        document.getElementById("keyboard-input").value = this.properties.value
    },

    createKeys(){
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l",
            "done", "z", "x", "c", "v", "b", "n", "m", "backspace",
            ",", "space", ".", "enter"
        ];
        
        const createIcon = (iconName) => {
            return `<i class="material-icons">${iconName}</i>`
        }
        
        let fragment = document.createDocumentFragment()
        keyLayout.forEach((key) => {
            const insertLineBreak = ["0", "p", "l", "backspace", "enter", "?"].indexOf(key) !== -1
            const keyboardButton = document.createElement("button")
            keyboardButton.setAttribute("class", "keyboard-key")
            
            
        
            switch (key){
                case "space":
                    keyboardButton.classList.add("space")
                    keyboardButton.innerHTML = createIcon("space_bar")
                    keyboardButton.addEventListener("click", (e) => {
                        this.properties.value += " "
                        this.textInput()
                    })
                    break
                
                case "caps":
                    keyboardButton.innerHTML = createIcon("keyboard_capslock")
                    keyboardButton.addEventListener("click", (e) => {
                        keyboardButton.classList.toggle("caps-on")
                        this.toggleCapslock()
                    })
                    break
        
                case "done":
                    keyboardButton.innerHTML = createIcon("check_circle")
                    keyboardButton.addEventListener("click", (e) => {
                        this.elements.container.classList.add("hidden-keyboard")
                    })
                    break
        
                case "backspace":
                    keyboardButton.innerHTML = createIcon("backspace")
                    keyboardButton.addEventListener("click", (e) => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1)
                        this.textInput()
                    });
                    
                    break
        
                case "enter":
                    keyboardButton.innerHTML = createIcon("keyboard_return")
                    keyboardButton.addEventListener("click", (e) => {
                        this.properties.value += "\n"
                        this.textInput()
                    })
                    break
        
                default:
                    keyboardButton.textContent = key
                    keyboardButton.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase()
                        this.textInput()
                    })
                    break
        
            }
            fragment.appendChild(keyboardButton)
            if (insertLineBreak){
                fragment.appendChild(document.createElement("br"))
            }
        })
        
        return fragment
    },

    toggleCapslock(){
        this.properties.capsLock = !this.properties.capsLock
        for (const key of this.elements.keys){
            if (key.childElementCount === 0){
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase()
            }
        }
    }
}


// window.addEventListener('DOMContentLoaded', function(){
    
// })

keyboard.init()

console.log("hello world")
console.log("little feature")
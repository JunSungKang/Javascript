class Input {
    constructor(build) {
        if (build) {
            this.clazz = build.clazz;
            this.id = build.id;
        }
    }

    static get NumberBox() {
        class NumberBox {
            min = undefined;
            max = undefined;
            event = {};

            setClass(clazz) {
                this.clazz = clazz;
                return this;
            }

            setId(id) {
                this.id = id;
                return this;
            }

            setMin(min) {
                this.min = min;
                return this;
            }

            setMax(max) {
                this.max = max;
                return this;
            }

            setTitle(title) {
                this.title = title;
                return this;
            }
            
            addEventListener(listener, event) {
                this.event[listener] = event;
                return this;
            }

            build(drawId) {
                let numberbox = document.createElement("input");
                numberbox.setAttribute("type", "number");
                if (this.id) {
                    numberbox.setAttribute("id", this.id);
                }
                if (this.clazz) {
                    numberbox.setAttribute("class", this.clazz);
                }
                if (this.min) {
                    numberbox.setAttribute("min", this.min);
                }
                if (this.max) {
                    numberbox.setAttribute("max", this.max);
                }
                for (let listener in this.event) {
                    numberbox.addEventListener(listener, this.event[listener]);
                }
                
                let node = document.getElementById(drawId);
                if (this.title && node) {
                    let label = document.createElement("label");
                    label.setAttribute("for", this.id);
                    label.appendChild(document.createTextNode(this.title));
                    node.appendChild(label);
                }
                if (node) {
                    node.appendChild(numberbox);
                }

                return numberbox;
            }
        }

        return new NumberBox();
    }

    static get TextBox() {
        class TextBox {
            placeholder = "";
            value = "";
            event = {};

            setClass(clazz) {
                this.clazz = clazz;
                return this;
            }

            setId(id) {
                this.id = id;
                return this;
            }

            setTitle(title) {
                this.title = title;
                return this;
            }

            setPlaceHolder(placeholder) {
                this.placeholder = placeholder;
                return this;
            }

            setValue(value) {
                this.value = value;
                return this;
            }
            
            addEventListener(listener, event) {
                this.event[listener] = event;
                return this;
            }

            build(drawId) {
                let textbox = document.createElement("input");
                textbox.setAttribute("type", "text");
                if (this.id) {
                    textbox.setAttribute("id", this.id);
                }
                if (this.clazz) {
                    textbox.setAttribute("class", this.clazz);
                }
                if (this.placeholder) {
                    textbox.setAttribute("placeholder", this.placeholder);
                }
                if (this.placeholder) {
                    textbox.setAttribute("value", this.placeholder);
                }
                for (let listener in this.event) {
                    textbox.addEventListener(listener, this.event[listener]);
                }
                
                let node = document.getElementById(drawId);
                if (this.title && node) {
                    let label = document.createElement("label");
                    label.setAttribute("for", this.id);
                    label.appendChild(document.createTextNode(this.title));
                    node.appendChild(label);
                }
                if (node) {
                    node.appendChild(textbox);
                }

                return textbox;
            }
        }

        return new TextBox();
    }

    static get CheckBox() {
        class CheckBox {
            event = {};

            setClass(clazz) {
                this.clazz = clazz;
                return this;
            }

            setId(id) {
                this.id = id;
                return this;
            }

            setTitle(title) {
                this.title = title;
                return this;
            }
            
            addEventListener(listener, event) {
                this.event[listener] = event;
                return this;
            }

            build(drawId) {
                let checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox");
                if (this.id) {
                    checkbox.setAttribute("id", this.id);
                }
                if (this.clazz) {
                    checkbox.setAttribute("class", this.clazz);
                }
                for (let listener in this.event) {
                    checkbox.addEventListener(listener, this.event[listener]);
                }
                
                let node = document.getElementById(drawId);
                if (this.title && node) {
                    let label = document.createElement("label");
                    label.setAttribute("for", this.id);
                    label.appendChild(document.createTextNode(this.title));
                    node.appendChild(label);
                }
                if (node) {
                    node.appendChild(checkbox);
                }

                return checkbox;
            }
        }

        return new CheckBox();
    }
}

var numberbox;
var textbox;
var checkbox;
window.onload = function() {
    numberbox = Input.NumberBox;
    numberbox.setId("n").setMin(0).setMax(20).build("test");

    textbox = Input.TextBox;
    tempTextbox = textbox.setId("t").setTitle("이름").setPlaceHolder("TEST").setValue("jskang")
    .addEventListener("click", (d) => {
        console.log(d)
    })
    .addEventListener("change", (d) => {
        console.log(d)
    })
    .addEventListener("input", (d) => {
        console.log(d.target.value)
    })
    .build("test");

    tempTextbox.disabled = true;

    checkbox = Input.CheckBox;
    checkbox.setId("c").setTitle("절단검색").build("test");
    checkbox.setId("a").setTitle("고급검색").build("test");
}
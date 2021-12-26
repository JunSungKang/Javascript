class SelectBox {
    constructor(build) {
        if (build) {
            this.clazz = build.clazz;
            this.id = build.id;
        }
    }

    static get Builder() {
        class Builder {
            options = [];

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

            setMultiple(using) {
                this.multiple = using;
                return this;
            }

            setOptions(options) {
                for (let i = 0; i < options.length; i++) {
                    let option = document.createElement("option");
                    for (let field in options[i]) {
                        if (field === "text") {
                            option.appendChild(document.createTextNode(options[i][field]));
                        } else {
                            option.setAttribute(field, options[i][field]);
                        }
                    }
                    this.options.push(option);
                }

                return this;
            }

            build(drawId) {
                let selectbox = document.createElement("select");
                if (this.id) {
                    selectbox.setAttribute("id", this.id);
                }
                if (this.clazz) {
                    selectbox.setAttribute("class", this.clazz);
                }
                if (this.multiple) {
                    selectbox.setAttribute("multiple", this.multiple);
                }
                for (let listener in this.event) {
                    selectbox.addEventListener(listener, this.event[listener]);
                }
                
                let node = document.getElementById(drawId);
                if (this.title) {
                    let label = document.createElement("label");
                    label.setAttribute("for", this.id);
                    label.appendChild(document.createTextNode(this.title));
                    node.appendChild(label);
                }
                if (this.options) {
                    for (let i=0; i<this.options.length; i++) {
                        selectbox.appendChild(this.options[i]);
                    }
                }
                node.appendChild(selectbox);

                return selectbox;
            }
        }

        return new Builder();
    }
}

window.onload = function() {
    let json = [
        { "text": "At1", "value": "Av1", "title": "At1"},
        { "text": "At2", "value": "Av2", "title": "At2"},
        { "text": "At3", "value": "Av3", "title": "At3", "selected": true},
        { "text": "At4", "value": "Av4", "title": "At4"},
    ];
    let selectbox = SelectBox.Builder;
    selectbox = selectbox.setId("n").setTitle("TEST").setOptions(json).build("test");
}
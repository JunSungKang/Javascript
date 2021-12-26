class Icon {
    constructor(build) {
        if (build) {
            this.clazz = build.clazz;
            this.id = build.id;
        }
    }

    static get Builder() {
        class Builder {
            event = {};

            setClass(clazz) {
                this.clazz = clazz;
                return this;
            }

            setId(id) {
                this.id = id;
                return this;
            }

            setIcon(icon) {
                this.icon = icon;
                return this;
            }

            setColor(color) {
                this.color = color;
                return this;
            }

            addEventListener(listener, event) {
                this.event[listener] = event;
                return this;
            }

            build(drawId) {
                let iconbox = document.createElement("i");
                if (this.id) {
                    iconbox.setAttribute("id", this.id);
                }
                if (this.clazz) {
                    iconbox.setAttribute("class", this.clazz);
                }
                if (this.icon) {
                    iconbox.setAttribute("class", this.icon);
                }
                for (let listener in this.event) {
                    iconbox.addEventListener(listener, this.event[listener]);
                }
                
                if (drawId) {
                    let node = document.getElementById(drawId);
                    if (this.title) {
                        let label = document.createElement("label");
                        label.setAttribute("for", this.id);
                        label.appendChild(document.createTextNode(this.title));
                        node.appendChild(label);
                    }
                    if (this.options) {
                        for (let i=0; i<this.options.length; i++) {
                            iconbox.appendChild(this.options[i]);
                        }
                    }
                    node.appendChild(iconbox);
                }

                return iconbox;
            }
        }

        return new Builder();
    }
}

var icon1, icon2;
window.onload = function() {
    icon1 = Icon.Builder;
    icon1 = icon1.setId("n").setIcon("glyphicon glyphicon-heart").build("test");
    icon1.addEventListener("click", () => { console.log(123); });

    
    icon2 = Icon.Builder;
    icon2 = icon2.setId("b").setIcon("glyphicon glyphicon-book").build();
    icon2.addEventListener("click", () => { console.log(456); });
    document.getElementById("test").appendChild(icon2);
}
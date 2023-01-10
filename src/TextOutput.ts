import { Container, DisplayObject, Graphics, TextStyle, Text } from 'pixi.js';

const style = new TextStyle ({
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0x000000
});

export class TextOutput extends Container {
    public chatLog = [];
    private messages: Container;

    constructor(
        private element: DisplayObject,
    ) {
        super();

        this.messages = new Container();

        this.addChild(this.element, this.messages);
    }

    addMessage(value: string) {
        this.chatLog.unshift(value);

        if (this.chatLog.length > 9) {
            this.chatLog.pop();
        }

        this.messages.removeChildren();

        for (let i = 0; i < this.chatLog.length; i++) {
            const text = new Text(this.chatLog[i], style);
            
            const message = new Graphics();
            message.beginFill(0xffffff);
            message.drawRoundedRect(0, 0, text.width + 15, 30, 10);
            message.endFill();
            
            message.addChild(text);
            message.position.set(725 - (text.width + 15), 450 - (text.height) - (i * 50));
            text.position.set(7, 0);


            // const message = new Graphics();
            // message.beginFill(0xffaa22);
            // message.drawRoundedRect(0, 0, text.width + 15, 30, 10);
            // message.endFill();

            // message.addChild(text);
            // message.position.set(25, 450 - (text.height) - (i * 50));
            // text.position.set(7, 0);

            this.messages.addChild(message);
        }
    }
}
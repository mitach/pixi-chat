import { Container, DisplayObject, TextStyle, Text, Graphics } from 'pixi.js';

const style = new TextStyle ({
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff
});

export class TextInput extends Container {
    private whitelist: string;
    private text: Text;
    private textHandler: () => void;

    constructor(
        private callback: () => void,
        private element: DisplayObject
    ) {
        super();

        this.whitelist =  ' qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMчявертъуиопшщасдфгхйклюзьцжбнмѝЧЯВЕРТЪУИОПШЩАСДФГХЙКЛЮЗЬЦЖБНМЍ1234567890`~№€§–“„!@#$%^&*()-_=+{};:|,.<>/\'"?\\';

        this.addChild(this.element);

        this.text = new Text('', style);
        this.text.position.set(10, 10);
        this.addChild(this.text);

        this.textHandler = this.onText.bind(this)

        this.interactive = true;

        this.on('pointerdown', this.onDown.bind(this));
    }

    get message() {
        return this.text.text;
    }

    clear() {
        this.text.text = '';
        this.onUnfocus();
    }

    private onUnfocus() {
        this.element.alpha = 1;
        document.body.removeEventListener('keydown', this.textHandler);
    }

    private onDown() {
        this.element.alpha = 0.7;

        document.body.addEventListener('keydown', this.textHandler);
    }

    private onText(e: KeyboardEvent) {
        if (e.key == 'Backspace') {
            this.text.text = this.text.text.substring(0, this.text.text.length - 1);
        }

        if (e.key == 'Enter') {
            this.callback();
        }

        if (e.key == 'Escape') {
            this.onUnfocus();
        }

        if (this.text.width > 550) {
            return;
        }
    
        if (this.whitelist.includes(e.key)) {
            this.text.text += e.key;
        }
    }
}
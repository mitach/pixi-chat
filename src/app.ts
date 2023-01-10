import * as PIXI from 'pixi.js';
import { Button } from './Button';
import { TextInput } from './TextInput';
import { TextOutput } from './TextOutput';
import { constructPanel } from './util';

import {io} from 'socket.io-client';

let socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('connected to port 3000');
    init();
})

const app = new PIXI.Application({width: 800, height: 600, backgroundColor: 0x44a2c4});
app.ticker.add(update);
document.body.appendChild(app.view as HTMLCanvasElement);

async function init() {
    const bevelBaseTexture = PIXI.BaseTexture.from('assets/bevel.png');
    const hoverBaseTexture = PIXI.BaseTexture.from('assets/hover.png');
    const insetBaseTexture = PIXI.BaseTexture.from('assets/inset.png');

    const assets = await Promise.all([bevelBaseTexture, hoverBaseTexture, insetBaseTexture]);

    const textOutput = new TextOutput(constructPanel(assets[0], 750, 475));
    textOutput.position.set(25, 25);

    const textInput = new TextInput(
        onSend,
        constructPanel(assets[0], 575, 50),
    );
    textInput.position.set(25, 525);

    const button = new Button(
        'Send',
        onSend,
        constructPanel(assets[0], 150, 50),
        constructPanel(assets[1], 150, 50),
        constructPanel(assets[2], 150, 50),
    );
    button.position.set(625, 525);

    app.stage.addChild(textOutput, textInput, button);

    socket.on('message', ({message}) => {
        console.log('delivered: ', message);
        textOutput.addMessage(message);
    });

    function onSend() {
        if (textInput.message) {
            console.log('sending:', textInput.message);

            socket.emit('message', textInput.message);

            // textOutput.addMessage(textInput.message);
            textInput.clear();
        }
    }
}

function update() {

}
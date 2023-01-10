import { BaseTexture, Sprite, Container, Rectangle, Texture } from "pixi.js";

function slice(BaseTexture: BaseTexture, x: number, y: number, w: number, h: number) {
    return new Texture(BaseTexture, new Rectangle(x, y, w, h));
}

function partsSlicer(baseTexture: BaseTexture) {
    return  {
        tl: new Sprite(slice(baseTexture, 0, 0, 25, 25)),
        t: new Sprite(slice(baseTexture, 25, 0, 80, 25)),
        tr: new Sprite(slice(baseTexture, 105, 0, 25, 25)),
        l: new Sprite(slice(baseTexture, 0, 25, 25, 80)),
        c: new Sprite(slice(baseTexture, 25, 25, 80, 80)),
        r: new Sprite(slice(baseTexture, 105, 25, 25, 80)),
        bl: new Sprite(slice(baseTexture, 0, 105, 25, 25)),
        b: new Sprite(slice(baseTexture, 25, 105, 80, 25)),
        br: new Sprite(slice(baseTexture, 105, 105, 25, 25)),
    }
}

export function constructPanel(baseTexture: BaseTexture, width: number, height: number) {
    const panel = new Container();
    const textures = partsSlicer(baseTexture);

    panel.addChild(textures.tl, textures.tr, textures.bl, textures.br);

    if (width < (textures.tl.width + textures.tr.width)) {
        const half = width / 2;
        textures.tl.width = half;
        textures.tr.width = half;
        textures.bl.width = half;
        textures.br.width = half;
        textures.l.width = half;
        textures.r.width = half;
    }

    if (height < (textures.tl.height + textures.tr.height)) {
        const half = height / 2;
        textures.tl.height = half;
        textures.tr.height = half;
        textures.bl.height = half;
        textures.br.height = half;
        textures.l.height = half;
        textures.r.height = half;
    }

    textures.tl.position.set(0, 0);
    textures.tr.position.set(width - textures.tr.width, 0);
    textures.bl.position.set(0, height - textures.bl.height);
    textures.br.position.set(width - textures.br.width, height - textures.br.height);

    if (width > textures.tl.width + textures.tr.width) {
        textures.t.width = width - (textures.tl.width + textures.tr.width);
        textures.b.width = width - (textures.bl.width + textures.br.width);

        textures.t.position.set(textures.tl.width, 0);
        textures.b.position.set(textures.bl.width, height - textures.b.height);

        panel.addChild(textures.t, textures.b);
    }

    if (height > textures.tl.height + textures.bl.height) {
        textures.l.height = height - (textures.tl.height + textures.bl.height);
        textures.r.height = height - (textures.tr.height + textures.br.height);

        textures.l.position.set(0, textures.tl.height);
        textures.r.position.set(width - textures.r.width, textures.tl.height);

        panel.addChild(textures.l, textures.r)
    }

    if ((width > (textures.tl.width + textures.tr.width)) && (height > (textures.tl.height + textures.bl.height))) {
        textures.c.width = width - (textures.tl.width + textures.tr.width);
        textures.c.height = height - (textures.tl.height + textures.bl.height);

        textures.c.position.set(textures.tl.width, textures.tl.height);

        panel.addChild(textures.c);
    }

    return panel;
}
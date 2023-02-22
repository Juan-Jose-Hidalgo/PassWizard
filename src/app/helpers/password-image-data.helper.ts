type ImagesType = {
    débil: { img: string; url: string; author: string; };
    media: { img: string; url: string; author: string; };
    fuerte: { img: string; url: string; author: string; };
    [key: string]: { img: string; url: string; author: string; };
};

export const IMG_DATA: ImagesType = {
    débil: {
        img: 'assets/img/debil.png',
        url: 'https://www.freepik.com/free-vector/princess-castle-tower-white-background_18616302.htm#query=castle%20tower&position=7&from_view=keyword',
        author: 'Imagen creada por brgfx en Freepik'
    },
    media: {
        img: 'assets/img/media.png',
        url: 'https://www.freepik.com/free-vector/stone-castle-fortress-cartoon-sticker_19703624.htm?query=castle tower',
        author: 'Imagen creada por brgfx en Freepik'
    },
    fuerte: {
        img: 'assets/img/fuerte.png',
        url: 'https://www.freepik.com/free-vector/stone-castle-fortress-cartoon-sticker_18180113.htm#query=castle%20tower&position=32&from_view=keyword',
        author: 'Imagen creada por brgfx en Freepik'
    }
}
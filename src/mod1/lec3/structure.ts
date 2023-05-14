/*
    Реализовать структуру на основе ArrayBuffer

    const jackBlack = Structure([
        ['name', 'utf16', 10], // Число - это максимальное количество символов
        ['lastName', 'utf16', 10],
        ['age', 'u16'] // uint16
    ]);

    jackBlack.set('name', 'Jack');
    jackBlack.set('lastName', 'Black');
    jackBlack.set('age', 53);

    console.log(jackBlack.get('name')); // 'Jack'
*/

export enum FORMAT {
   UTF16 = 'utf16',
   U16 = 'u16',
};

type Tformat = `${FORMAT}`;

class ItemStructure {
    value: ArrayBuffer;
    format: Tformat;
    maxSize: number;
    private view: DataView;

    constructor(format: Tformat, maxSize: number = 2) {
        this.format = format;
        this.maxSize = maxSize;
        this.value = new ArrayBuffer(maxSize);
        this.view = new DataView(this.value);
    }

    get() {
        if (this.format === FORMAT.U16) {
            return this.view.getInt16(0);
        }
        if (this.format === FORMAT.UTF16) {
            const textDecoder = new TextDecoder();
            return textDecoder.decode(this.value);
        }
    }

    set(value: unknown) {
        if (this.format === FORMAT.U16) {
            if (typeof value !== 'number') throw new Error(`Value isn't wrong format`);
            this.view.setInt16(0, value);
            return;
        }
        if (this.format === FORMAT.UTF16) {
            if (typeof value !== 'string') throw new Error(`Value isn't wrong format`);
            const textEncoder = new TextEncoder();
            this.value = textEncoder.encode(value);
            return;
        }
    }
}

type StructureType = ([string, Tformat] | [string, Tformat, number])[];

export class Structure {
    private localData: Record<string, ItemStructure> = {};

    constructor(array: StructureType) {
        for(let item of array) {
            const [key, format, length] = item;
            this.localData[key] = new ItemStructure(format, length);
        }
    }

    get(key: string) {
        if (key in this.localData) {
            return this.localData[key].get();
        }
        this.errorStructure(key);
    }

    set(key: string, value: unknown) {
        if (key in this.localData) {
            return this.localData[key].set(value);
        }
        this.errorStructure(key);
    }

    private errorStructure(key: unknown) {
        throw new Error (`Structure doesn't have ${key} key`);
    }
}
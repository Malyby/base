/* 
    Написать функцию кодирования информации по схеме

    const schema = [
        [3, 'number']  // 3 бита число
        [2, 'number']  // 3 бита число
        [1, 'boolean'] // 1 бит логический
        [1, 'boolean'] // 1 бит логический
        [16, 'ascii']  // 16 бит 2 аски символа
    ];

    Если данные не подходят схеме - выбрасывать исключения с пояснением.
    Результат - ArrayBuffer.
    const data = encode([2, 3, true, false, 'ab'], schema);
*/
import { AvailableValue, Schema } from "./code.type";

export function encode(data: AvailableValue[], schema: Schema) {
    return;
}
import { LinkedList } from "./linkied-list";
import { Structure } from "./structure";

export function lec3() {
    //Связный список
    let linkedList = new LinkedList();

    linkedList.push(1);
    linkedList.push(2);
    linkedList.push(3);
    
    console.log(linkedList.first?.value);             // 1
    console.log(linkedList.last?.value);              // 3
    console.log(linkedList.first?.next?.value);       // 2
    console.log(linkedList.first?.next?.prev?.value); // 1
    
    for (const value of linkedList) {
        console.log(value);
    }

    //Структура
    let structure = new Structure([
        ['name', 'utf16', 10],
        ['lastName', 'utf16', 10],
        ['age', 'u16'],
    ]);

    structure.set('name', 'Jack');
    structure.set('lastName', 'Black');
    structure.set('age', 53);
    
    console.log(structure.get('name')); // 'Jack'
    console.log(structure.get('age')); // 53
}

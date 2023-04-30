export function lec1() {
    function createBitGetter(arr: Uint8Array) {
        function get(idx: number, bitIdx: number): number {
            return (arr[idx] & (1 << bitIdx)) > 0 ? 1 : 0;
        }
        function set(idx: number, bitIdx: number, val: 0 | 1): void {
            if (val === 0) {
                arr[idx] &= (0 << bitIdx);
                return;
            }
            if (val === 1) {
                arr[idx] |= (1 << bitIdx);
                return;
            }
        }
    
        return {
            get,
            set
        }
    }
    
    const bitAccessor = createBitGetter(new Uint8Array([0b1110, 0b1101]));
    
    // Второй параметр это порядок бита "справа-налево"
    console.log(bitAccessor.get(0, 1)); // 1
    console.log(bitAccessor.get(1, 1)); // 0
    
    // Второй параметр это порядок бита "справа-налево"
    console.log(bitAccessor.set(0, 1, 0)); // 
    console.log(bitAccessor.get(0, 1));    // 0
};

function createSubstring(subStringId) {
    let subSet1 = subStringId.substring(1, 4);
    let subSet2 = subStringId.substring(6, 10);
    let subSet3 = subStringId.substring(1, 2);
    let subSet4 = subStringId.substring(3, 8);
    let subSet5 = subStringId.substring(1, 2);
    let subSet6 = subStringId.substring(8, 15);
    let subSet7 = subStringId.substring(1, 9);
    let subSet8 = subStringId.substring(5, 10);

    return `${subSet1}${subSet2}${subSet3}${subSet4}${subSet5}${subSet3}${subSet2}${subSet6}${subSet7}${subSet8}`;
}
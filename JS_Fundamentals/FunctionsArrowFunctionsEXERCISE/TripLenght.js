function tripLenght(arr){
    let [x1, y1, x2, y2, x3, y3] = arr

    let len12 = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    let len23 = Math.sqrt(Math.pow((x3 - x2), 2) + Math.pow((y3 - y2), 2));
    let len13 = Math.sqrt(Math.pow((x3 - x1), 2) + Math.pow((y3 - y1), 2));

    if ((len12 <= len13) && ( len13 >= len23)) {
        console.log('1->2->3: ' + (len12 + len23));
    }
    else if ((len12 <= len23) && (len13 < len23)) {
        console.log('2->1->3: '+ (len12 + len13));
    }
    else {
        console.log('1->3->2: ' + (len23 + len13));
    }
}
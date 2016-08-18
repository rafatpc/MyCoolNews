export default function getValue(id) {
    let node = document.getElementById(id);

    return (node || {value: ""}).value;
}

export default function getNodeByData(obj) {
    return document.querySelector("[data-" + obj.attribute + "='" + obj.value + "']");
}

export default function getNodeById(id) {
    return document.getElementById(id);
}

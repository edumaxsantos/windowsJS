// verificar o uso de header. 

class Windows {
    constructor(obj) {
        this.win = obj;
        this.win.header = Object.create(obj);
        this.win.header.title = this.win.title;
        this.win.header.bgColor = 'white';
        this.win.header.height = 20;
        //this.win.header.control = {minimize: null, maximize: null, close: null};
        this.win.initial = {};
        this.win.initial.x = this.win.x;
        this.win.initial.y = this.win.y;
        this.win.initial.width = this.win.width;
        this.win.initial.height = this.win.height;
        Windows.counter++;
        Windows.resize = 0.98;
        Windows.minWidth = Windows.minHeight = 120;

        this.windowHandler(this.win);
        this.headerHandler(this.win.header, this.win);
    }


    handler(win) {
        this.build(win);
        this.setSize(win);
        this.callWindow(win);

    }

    windowHandler(win) {
        this.handler(win);
        this.setWindow(win);
        this.setBorder(win);
        this.setBgColor(win);
        this.setOtherProp(win);
        this.resize(win);
    }

    headerHandler(head, win) {
        this.handler(head);
        this.setTitle(head, win);
        this.setControlButtons(head, win);
        this.setDraggable(head);
        this.setHeader(head);
        this.attachEvents(head, win);
        this.setBgColor(head);
        this.composeWindow(head, win);
    }

    composeWindow(head, win) {
        win.el.appendChild(head.el);
        document.body.appendChild(win.el);
    }

    build(win) {
        win.el = document.createElement('DIV');
        //document.body.appendChild(obj.el);
    }

    setControlButtons(head, win) {
        const container = document.createElement('DIV');
        const exitText = document.createElement('P');
        const minText = document.createElement('P');
        const maxText = document.createElement('P');
        const exit = document.createElement('DIV');
        const min = document.createElement('DIV');
        const max = document.createElement('DIV');

        exitText.appendChild(document.createTextNode(''));
        exitText.classList.add('exitB');
        minText.appendChild(document.createTextNode(''));
        minText.classList.add('minB');
        maxText.appendChild(document.createTextNode(''));
        maxText.classList.add('maxB');
        exit.appendChild(exitText);
        min.appendChild(minText);
        max.appendChild(maxText);

        exit.classList.add('winButtons');
        min.classList.add('winButtons');
        max.classList.add('winButtons');
        container.classList.add('controlButtons');

        exit.addEventListener('click', (event) => {
            console.log(event);
            win.el.parentNode.removeChild(win.el);
        });
        min.addEventListener('click', (event) => {
            if (event.target.parentNode.classList.contains('minSize')) {
                event.target.parentNode.classList.remove('minSize');
                win.height = win.initial.height;
                this.setSize(win);
            } else {
                event.target.parentNode.classList.add('minSize');
                win.height = 0;
                this.setSize(win);
            }
        });
        max.addEventListener('click', (event) => {
            console.log(event);
            if (event.target.parentNode.classList.contains('maxSize')) {
                //console.log(win === head);
                event.target.parentNode.classList.remove('maxSize');
                win.width = win.initial.width;
                win.height = win.initial.height;
                head.width = win.width;
                this.setLeft(win, win.initial.x);
                this.setTop(win, win.initial.y);
                this.setSize(win);
                this.setSize(head);
            } else {
                event.target.parentNode.classList.add('maxSize');
                win.width = window.innerWidth;
                win.height = window.innerHeight;
                head.width = win.width-1;
                this.setLeft(win, 0);
                this.setTop(win, 0);
                this.setSize(win);
                this.setSize(head);
            }
            
            console.log(win);
        });

        container.appendChild(min);
        container.appendChild(max);
        container.appendChild(exit);

        head.el.appendChild(container);
    }

    setTitle(head, win) {
        const wrapper = document.createElement('DIV');
        const title = document.createElement('P');
        title.appendChild(document.createTextNode(head.title));
        wrapper.classList.add('titleWindow');
        wrapper.appendChild(title);
        head.el.appendChild(wrapper);
    }
    setSizeX(obj) {
        obj.el.style.width = (typeof obj.width === 'number') ? (obj.width + 'px') : (obj.width);
    }

    setSizeY(obj) {
        obj.el.style.height = (typeof obj.height === 'number') ? (obj.height + 'px') : (obj.height);
    }
    setSize(win) {
        this.setSizeX(win);
        this.setSizeY(win);
    }

    setBorder(win) {
        win.el.style.border = '1px solid ' + win.bgColor;
    }

    setBgColor(obj) {
        obj.el.style.backgroundColor = obj.bgColor;
    }

    setOtherProp(win) {
        win.el.style.position = 'absolute';
        win.el.style.top = (typeof win.y === 'number') ? (win.y + 'px') : (win.y) ;
        win.el.style.left = (typeof win.x === 'number') ? (win.x + 'px') : (win.x);
        win.el.style.zIndex = Windows.counter + 0;
    }

    setWindow(win) {
        win.el.classList.add('window');
    }

    setHeader(head) {
        head.el.classList.add('header');
    }

    setDraggable(head) {
        head.el.setAttribute('draggable', 'true');
    }

    callWindow(win) {
        win.el.addEventListener('mousedown', (event) => {
            const windows = document.getElementsByClassName('window');
            for (let e of windows) {
                if (e.style.zIndex > win.el.style.zIndex)
                    e.style.zIndex -= 1;
            }
            win.el.style.zIndex = Windows.counter;
        });
    }

    attachEvents(head, win) {
        head.el.addEventListener('dragstart', (event) => {
            head.initial.x = event.clientX;
            head.initial.y = event.clientY; 

        });

        head.el.addEventListener('dragend', (event) => {
            const newX = event.clientX - (head.initial.x - head.x);
            const newY = event.clientY - (head.initial.y - head.y);
            (newX >= 0) ? this.setLeft(win, newX) : this.setLeft(win, 0);
            (newY >= 0) ? this.setTop(win, newY) : this.setTop(win, 0);
            
        });
    }

    setLeft(win, val) {
        win.el.style.left = val + 'px';
        win.x = val;
    }

    setTop(win, val) {
        win.el.style.top = val + 'px';
        win.y = val;
    }

    resize(win) {
        this.addResize(win);
        this.resizing(win);
    }


    addResize(win) {
        win.el.addEventListener('mousemove', (event) => {
            (event.offsetY > win.height * Windows.resize) ? this.resizeClass(win, true, 'resizeY') : this.resizeClass(win, false, 'resizeY');
            (event.offsetX > win.width * Windows.resize) ? this.resizeClass(win, true, 'resizeX') : this.resizeClass(win, false, 'resizeX');
        });
    }

    resizeClass(win, b, cl) {
        (b) ? win.el.classList.add(cl) : win.el.classList.remove(cl);
    }
    resizing(win) {
        let posX, posY, newPosX, newPosY;
        win.el.addEventListener('mousedown', (event) => {
            if (event.offsetX > win.width * Windows.resize)
                posX = event.clientX;
            else {
                posX = null;
                if (event.offsetY > win.height * Windows.resize)
                    posY = event.clientY;
                else
                    posY = null; 
            }
        });

        
        window.addEventListener('mousedown', (event) => {
            if (event.target !== win.el)
                posX = posY = null;
        });

        window.addEventListener('mouseup', (event) => {
            if (posX !== null) {
                newPosX = event.clientX;
                ((newPosX - posX) + win.width >= Windows.minWidth) ? win.width = (newPosX - posX) + win.width : win.width = Windows.minWidth;
                win.header.width = win.width;
                this.setSizeX(win);
                this.setSizeX(win.header);
               
            } else if (posY !== null) {
                newPosY = event.clientY;
                ((newPosY - posY) + win.height >= Windows.minHeight) ? win.height = (newPosY - posY) + win.height : win.height = Windows.minHeight;
                win.header.height = win.height;
                this.setSizeY(win);
            }
        });
    }

    controls(obj) {

    }

}

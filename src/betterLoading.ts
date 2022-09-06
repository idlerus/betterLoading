import Soli from 'spidersolitairegame';

class betterLoading
{
    private keyStrokes: number[] = [];
    private hist: number = 0;
    private invoked: boolean = false;
    private suites: number;
    private code: number[];

    constructor(code = [38,38,40,40,39,37,39,37,66,65], suites: number = 1)
    {
        this.suites = suites;
        this.hist = code.length-1;
        this.code = code;
        document.addEventListener('keydown', this.keyStrokeListener.bind(this));
    }

    private keyStrokeListener(e)
    {
        if(!this.invoked)
        {
            if(this.keyStrokes.length > this.hist)
            {
                this.keyStrokes.shift();
                this.keyStrokes.push(e.keyCode);
            }
            else
            {
                this.keyStrokes.push(e.keyCode);
            }

            if(this.keyStrokes.join('') === this.code.join(''))
            {
                this.invoke();
            }
        }
    }

    private invoke()
    {
        this.invoked = true;
        let div = document.createElement('div');
        div.id = 'solitaire';
        div.style.position = 'absolute';
        div.style.zIndex = '9999999';
        div.style.width = '350px';
        div.style.height = '400px';
        div.style.border = '1px solid #000';
        div.style.background = '#ddd';
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.draggable = true;
        let soli = new Soli(this.suites);
        soli.gameSet();

        let handle = document.createElement('div');
        handle.id = 'solitaireheader';
        handle.style.textAlign = 'center';
        handle.style.height = '16px';
        handle.style.width = '100%';
        handle.style.padding = '5px 0';
        handle.style.display = 'flex';
        handle.style.borderBottom = '1px solid #000';

        let insideText = document.createElement('span');
        insideText.innerText = 'Spider solitaire :)';
        insideText.style.flex = '1';
        insideText.style.borderRight = '1px solid #000';
        insideText.style.cursor = 'move';
        handle.appendChild(insideText);

        let closeButton = document.createElement('span');
        closeButton.innerText = '✕';
        closeButton.style.cursor = 'grab';
        closeButton.style.padding = '0 5px';
        let closeListener = () => {
            this.invoked = false;
            div.remove();
        }
        closeButton.addEventListener('click', closeListener.bind(this));

        handle.appendChild(closeButton);

        div.appendChild(handle);

        div.appendChild(soli.renderG());

        this.dragElement(div);
        document.body.appendChild(div);
    }

    private dragElement(elmnt)
    {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header"))
        {
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        }
        else
        {
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e)
        {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e)
        {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement()
        {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}

export default betterLoading;
module.exports.default = betterLoading;

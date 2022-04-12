class ClockModel {

    constructor() {
        this.canvas = document.getElementById('canvasClock');
        this.ctx = this.canvas.getContext('2d');
        this.speedRotatinArrows = 1000;
        this.reversArrows = false;

        this._radiusClock = this.canvas.width / 2 * 0.9;
        this._xCenterClock = this.canvas.width / 2;
        this._yCenterClock = this.canvas.height / 2;
        this._createBackgroundCanvas();
    }

    setDate(date) {
        this._MSdate = date;
    }

    isCheckNum(num) {
        return (num < 0 ? (num * -1) : num);
    }

    _createBackgroundCanvas() {
        this.canvas.backgroundCanvas = document.createElement('canvas');
        this.canvas.backgroundCanvas.width = this.canvas.width;
        this.canvas.backgroundCanvas.height = this.canvas.height;
        let ctx = this.canvas.backgroundCanvas.getContext('2d');
        //Рисуем контур часов
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this._xCenterClock, this._yCenterClock, this._radiusClock, 0, 2 * Math.PI, true);
        ctx.stroke();
        ctx.closePath();
        // Рисуем линии, по которым двигаютя стрелки
        let radiusStartLine = this._radiusClock - 30; ////Радиус расположения боковых линий
        let lengthLine;
        let xLine;
        let yLine;
        /* Коэфицент, отвечающий за смещение более коротких линий,
        по которым движутся стрелки, для привычного отображения.
        Рассчитывается следующим путём: вычается из большего значения lengthLine меньшее,
        например, lengthLine = 25 и lengthLine = 15, cоответвенно k = 10 */
        let k;
        for (let i = 0; i < 60; i++) {
            ctx.beginPath();
            if (i % 5 == 0) {
                lengthLine = 25;
                k = 0;
            } else {
                lengthLine = 15;
                k = 10;
            }
            xLine = this._pointXLine(this._xCenterClock, radiusStartLine + k, i, 6);
            yLine = this._pointYLine(this._yCenterClock, radiusStartLine + k, i, 6);
            ctx.moveTo(xLine, yLine);
            ctx.lineTo(this._pointXLine(xLine, lengthLine, i, 6),
                this._pointYLine(yLine, lengthLine, i, 6));
            ctx.stroke();
            ctx.closePath();
        }
        //рисуем цифры от 1 до 12
        let xNum;
        let yNum;
        for (let i = 1; i <= 12; i++) {
            ctx.beginPath();
            ctx.font = 'bold 30px sans-serif';
            xNum = this._pointXLine(this._xCenterClock, radiusStartLine - 30, i, 30);
            yNum = this._pointYLine(this._yCenterClock, radiusStartLine - 30, i, 30);
            if (i <= 9)
                ctx.strokeText(i, xNum - 7, yNum + 10);
            else
                ctx.strokeText(i, xNum - 15, yNum + 10);
            ctx.stroke();
            ctx.closePath();
        }
    }

    _pointXLine(x, radius, value, angle) {
        return (x + radius * Math.cos(-angle * value * (Math.PI / 180) + Math.PI / 2));
    }

    _pointYLine(y, radius, value, angle) {
        return (y - radius * Math.sin(-angle * value * (Math.PI / 180) + Math.PI / 2));
    }

    drawsArrows() {
        let lengthSeconds = this._radiusClock - 40;
        let lengthMinutes = this._radiusClock - 45;
        let lengthHour = lengthMinutes / 1.5;

        this._MSdate = (this.reversArrows == false ? (this._MSdate + this.isCheckNum(this.speedRotatinArrows)) : (this._MSdate - this.isCheckNum(this.speedRotatinArrows)));
        console.log(this.reversArrows);

        let date = new Date(this._MSdate);
        let t_sec = 6 * date.getSeconds();
        let t_min = 6 * (date.getMinutes() + (1 / 60) * date.getSeconds());
        let t_hour = 30 * (date.getHours() + (1 / 60) * date.getMinutes());

        //Секундная стрелка
        this.ctx.beginPath();
        this.ctx.moveTo(this._xCenterClock, this._yCenterClock);
        this.ctx.lineTo(this._pointXArrow(this._xCenterClock, lengthSeconds, t_sec),
            this._pointYArrow(this._yCenterClock, lengthSeconds, t_sec));
        this.ctx.stroke();
        this.ctx.closePath();
        //Минутная стрелка
        this.ctx.beginPath();
        this.ctx.moveTo(this._xCenterClock, this._yCenterClock);
        this.ctx.lineTo(this._pointXArrow(this._xCenterClock, lengthMinutes, t_min),
            this._pointYArrow(this._yCenterClock, lengthMinutes, t_min));
        this.ctx.stroke();
        this.ctx.closePath();
        //Часовая стрелка
        this.ctx.beginPath();
        this.ctx.moveTo(this._xCenterClock, this._yCenterClock);
        this.ctx.lineTo(this._pointXArrow(this._xCenterClock, lengthHour, t_hour),
            this._pointYArrow(this._yCenterClock, lengthHour, t_hour));
        this.ctx.stroke();
        this.ctx.closePath();
    }

    _pointXArrow(x, radius, value) {
        return (x + radius * Math.cos(Math.PI / 2 - value * (Math.PI / 180)));
    }
    _pointYArrow(y, radius, value) {
        return (y - radius * Math.sin(Math.PI / 2 - value * (Math.PI / 180)));
    }

}

export { ClockModel };
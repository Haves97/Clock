class ClockView {

    setController(controller) {
        this.clockController = controller;
    }

    paintClock() {
        this.clockController.clockModal.ctx.clearRect(0, 0, this.clockController.clockModal.canvas.width, this.clockController.clockModal.canvas.height);
        this.clockController.clockModal.ctx.drawImage(this.clockController.clockModal.canvas.backgroundCanvas, 0, 0);
        this.clockController.clockModal.drawsArrows();
        setTimeout(this.paintClock.bind(this), this.clockController.clockModal.isCheckNum(this.clockController.clockModal.speedRotatinArrows));
    }

    handleEvent(event) {
        switch (event.target.id) {
            case "reversArrows":
                this.clockController.reversArrows();
                break;
            case "boost":
                this.clockController.boost();
                document.getElementById('text').textContent = `Скорость движения стрелки ${this.clockController.clockModal.speedRotatinArrows / 1000} с`;
                break;
            case "reduce":
                this.clockController.reduce();
                document.getElementById('text').textContent = `Скорость движения стрелки ${this.clockController.clockModal.speedRotatinArrows / 1000} с`;
                break;
        }
    }
}

export { ClockView };
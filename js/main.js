import { ClockController } from '/js/ClockController.js';
import { ClockView } from '/js/ClockView.js';
import { ClockModel } from '/js/ClockModel.js';


const clockController = new ClockController();
const clockModal = new ClockModel();
clockModal.setDate(Date.now());
const clockView = new ClockView();

clockView.setController(clockController);
clockController.setModel(clockModal);
clockController.setView(clockView);

reversArrows.addEventListener('click', clockView);
boost.addEventListener('click', clockView);
reduce.addEventListener('click', clockView);

clockView.paintClock();






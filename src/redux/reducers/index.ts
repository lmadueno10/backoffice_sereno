import { combineReducers } from "redux";
import modalVideoReducer from './modalResucer';
import signInReducer from './loginReducer';
import loadingReducer from './loadingReducer';
import incidenciaReducer from './incidenciaReducer';
import personalCampoReducer from './personalcampoReducers';
import usuarioReducer from './usuarioReducer';
import clasificacionIncidenciaReducer from './clasificacioninidenciaReducer';
import tipoincidenciaReducer from './tipoincidenciaReducer';
import subtipoIncidenciaReducer from './subtipoinidenciaReducer';
import tipoAccionReducer from'./tipoaccionReducers'
import videoReducer from './videoReducer';
import grupoReducer from './grupoReducer'
const rootReducers= combineReducers({
    modalVideoReducer,
    signInReducer,
    loadingReducer,
    incidenciaReducer,
    personalCampoReducer,
    usuarioReducer,
    clasificacionIncidenciaReducer,
    tipoincidenciaReducer,
    tipoAccionReducer,
    subtipoIncidenciaReducer,
    videoReducer,
    grupoReducer
});
export default rootReducers;
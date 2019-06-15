import './plugins/forEach';
import run from './plugins/run';


import header from '../../components/header/header';
import testvue from '../../components/testvue/testvue';

run('.js-page', header)
run('.js-testvue', testvue);

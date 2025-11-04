// aca vamos a mostrar que componentes le vamos a mostrar al usuario

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginView from './views/LoginView'
import MainView from './views/MainView';
import RegisterView from './views/RegisterView';
import AuthLayout from './layouts/AuthLayout';
import FormView from './views/FormView';
import PrivateRoute from './routes/PrivateRoute';
import UsersView from './views/UsersView';
import RecommendationsView from './views/RecommendationsView';
import Maps from './components/Maps';
import RecommendationsFree from './components/RecommendationsFree';
import Reserve from './components/Reserve';

export default function Router(){

    return(
        <BrowserRouter>
            <Routes>

                <Route>
                    <Route path='/' element={<MainView/>} />
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path='/auth/login' element={<LoginView/>} />
                    <Route path='/auth/register' element={<RegisterView/>} />
                </Route>

                <Route path='/form' element={
                    <PrivateRoute>
                        <FormView/>
                    </PrivateRoute>
                } />
                <Route path='/users' element={
                    <PrivateRoute>
                        <UsersView/>
                    </PrivateRoute>
                } />
                <Route path='/recomendaciones' element={
                    <PrivateRoute>
                        <RecommendationsView/>
                    </PrivateRoute>
                } />
                <Route path='/mapa' element={
                    <PrivateRoute>
                        <Maps/>
                    </PrivateRoute>
                } />
                <Route path='/freeWalkingTour' element={
                    <PrivateRoute>
                        <RecommendationsFree/>
                    </PrivateRoute>
                } />
                <Route path='/reserve' element={
                    <PrivateRoute>
                        <Reserve/>
                    </PrivateRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}
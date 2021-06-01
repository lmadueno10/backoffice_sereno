import React from 'react';
import store from 'redux/store';
import { Provider } from 'react-redux';
import ContentMain from 'Components/ContentMain';
const App: React.FC = () => {
	console.log("store\n-------------------------------------------", store.getState())
	return (
		<Provider store={store}>
			<ContentMain />
		</Provider>
	)
		/*
		<Provider store={store}>
			<div className={clases.root}>
				{isLogged=useSelector((other:any) => other.signInReducer.state.isLogged)}
				<BrowserRouter>
					{isLogged && <>
						<Navbar openDrawer={openDrawer} />
						<Hidden xsDown >
							<DraweMenu variant={v} open={true} />
						</Hidden>
						<Hidden smUp >
							<DraweMenu variant='temporary' open={abrir} onClose={openDrawer} />
						</Hidden>
					</>
					}
					<div className={clases.content}>
					<div className={clases.toolbar}>Toolbar Main</div>
					<Switch>
						<Route path='/inicio'>
							<Home />
						</Route>
						<Route path='/login'>
							{isLogged && <><NavbarLogin />
								<Login /></>}
							{isLogged&&<p>Wellcome</p>}
						</Route>
						<Route path='/usuario'>
							<Usuario />
						</Route>
						<Route path='/clasificacion'>
							<Clasificacion />
						</Route>
						<Route path='/tipo'>
							<Tipo />
						</Route>
					</Switch></div>
				</BrowserRouter>
			
			</div>
		</Provider>
	);*/
	/*
	return (
		<>	
			<BrowserRouter>
				<Switch>
				<Route path='/inicio'>
						<Home />
					</Route>
					<Route path='/login'>
						<NavbarLogin />
						<Login />
					</Route>
					<Route path='/usuario'>
						<Usuario />
					</Route>
				</Switch>
			</BrowserRouter>
		</>
	);*/
}

export default App;

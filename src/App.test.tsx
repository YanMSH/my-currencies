import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import {MemoryRouter} from "react-router-dom";

const store = setupStore();

test('renders app header title', () => {

  render(<MemoryRouter><Provider store={store}><App /></Provider></MemoryRouter>);
  const headerElement = screen.getByText(/my currencies/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders main page route', () => {

  const coursesPageRoute = '/'

  render(<MemoryRouter initialEntries={[coursesPageRoute]}><Provider store={store}><App /></Provider></MemoryRouter>);
  const headerElement = screen.getByText(/courses page/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders convert route', () => {

  const convertPageRoute = '/convert/'

  render(<MemoryRouter initialEntries={[convertPageRoute]}><Provider store={store}><App /></Provider></MemoryRouter>);
  const headerElement = screen.getByText(/convert your currency/i);
  expect(headerElement).toBeInTheDocument();
});



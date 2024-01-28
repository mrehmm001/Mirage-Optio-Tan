import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders "Application Portal" title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Application portal/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders Load More', async () => {
  render(<App />);
  const button = await screen.findByText(/Load more/i);
  expect(button).toBeInTheDocument();
});

test('renders 5 applications', async () => {
  render(<App />);
  const applications = await screen.findAllByText(/Company/i);
  expect(applications.length).toBe(5);
});

test('renders 5 applications and then 10 applications', async () => {
  render(<App />);
  const applications = await screen.findAllByText(/Company/i);
  expect(applications.length).toBe(5);
  const button = await screen.findByText(/Load more/i);
  button.click();
  setTimeout( async() => { 
    const applications2 = await screen.findAllByText(/Company/i);
    expect(applications2.length).toBe(10);
  }, 1000);
})




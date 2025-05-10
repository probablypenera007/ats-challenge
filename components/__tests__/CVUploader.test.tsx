import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CVUploader from '../CVUploader';

describe('CVUploader Component', () => {
  it('renders the upload prompt correctly', () => {
    render(<CVUploader cvFile={null} setCvFile={jest.fn()} />);
    expect(screen.getByText(/Click to Upload Your CV/i)).toBeInTheDocument();
  });

  it('clicking the uploader triggers hidden file input', () => {
    render(<CVUploader cvFile={null} setCvFile={jest.fn()} />);

    const uploader = screen.getByText(/Click to Upload Your CV/i).parentElement!;
    const input = screen.getByTestId('cv-upload-input') as HTMLInputElement;

    const clickSpy = jest.spyOn(input, 'click');
    fireEvent.click(uploader);

    expect(clickSpy).toHaveBeenCalled();
  });

  it('displays selected file name after upload', () => {
    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });
    const setCvFile = jest.fn();

    render(<CVUploader cvFile={file} setCvFile={setCvFile} />);

    expect(screen.getByText(/Selected: resume.pdf/i)).toBeInTheDocument();
  });

  it('calls setCvFile when a file is selected', () => {
    const setCvFile = jest.fn();
    render(<CVUploader cvFile={null} setCvFile={setCvFile} />);

    const input = screen.getByTestId('cv-upload-input') as HTMLInputElement;
    const file = new File(['dummy'], 'cv.txt', { type: 'text/plain' });

    fireEvent.change(input, {
      target: { files: [file] },
    });

    expect(setCvFile).toHaveBeenCalledWith(file);
  });
});
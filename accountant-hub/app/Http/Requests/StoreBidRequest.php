<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBidRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'proposed_price' => ['required', 'numeric', 'min:0'],
            'estimated_delivery_time' => ['required', 'string', 'max:255'],
            'cover_letter' => ['required', 'string', 'min:20'],
            'experience_summary' => ['required', 'string', 'min:20'],
        ];
    }

    public function messages(): array
    {
        return [
            'proposed_price.required' => 'Please provide your proposed price.',
            'proposed_price.numeric' => 'Price must be a number.',
            'proposed_price.min' => 'Price cannot be negative.',
            'estimated_delivery_time.required' => 'Please provide an estimated delivery time.',
            'cover_letter.required' => 'A cover letter is required.',
            'cover_letter.min' => 'Cover letter must be at least 20 characters.',
            'experience_summary.required' => 'Please provide your experience summary.',
            'experience_summary.min' => 'Experience summary must be at least 20 characters.',
        ];
    }
}

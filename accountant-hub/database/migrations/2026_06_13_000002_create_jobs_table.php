<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('client_name');
            $table->text('description');
            $table->string('short_description');
            $table->decimal('budget_min', 12, 2);
            $table->decimal('budget_max', 12, 2);
            $table->date('deadline');
            $table->json('required_skills');
            $table->string('delivery_time');
            $table->enum('status', ['open', 'closed'])->default('open');
            $table->foreignId('job_category_id')->constrained()->cascadeOnDelete();
            $table->json('attachments')->nullable();
            $table->timestamp('posted_at')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};

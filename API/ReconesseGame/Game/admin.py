from django.contrib import admin
from Game.models import Level, Question, Answer

class AnswersInline(admin.TabularInline):
    model = Answer
    extra = 4

class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswersInline]


admin.site.register(Level)
admin.site.register(Question, QuestionAdmin)

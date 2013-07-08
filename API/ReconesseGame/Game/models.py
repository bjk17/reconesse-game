from django.db import models


class Level(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    def __unicode__(self):
        return self.title


class Question(models.Model):
    level = models.ForeignKey(Level)
    question = models.CharField(max_length=400)
    def __unicode__(self):
        return self.question


class Answer(models.Model):
    question = models.ForeignKey(Question)
    answer = models.CharField(max_length=400)
    rightAnswer = models.BooleanField(default=False)
    def __unicode__(self):
        return self.answer
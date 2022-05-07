# Generated by Django 4.0.4 on 2022-05-07 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dongdongapp', '0002_post'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='content',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='exercise',
            field=models.CharField(max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='exercise_skil',
            field=models.IntegerField(default=1, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='gender',
            field=models.CharField(max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='location',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='post_date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='required_number',
            field=models.IntegerField(default=1, null=True),
        ),
    ]

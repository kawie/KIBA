import RPi.GPIO as GPIO, time, os, subprocess

GPIO.setmode(GPIO.BCM)

LED_01 = 23

class RoboControl:
	def __init__(self):
		GPIO.setup(LED_01, GPIO.OUT)
		self.reset

	def reset():
	  GPIO.output(LED_01, False)

	def light(self, timer):
  		while True:
  			GPIO.output(LED_01, True)
			time.sleep(timer)
			GPIO.output(LED_01, False)
			time.sleep(timer)

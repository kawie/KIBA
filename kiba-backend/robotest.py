import RPi.GPIO as GPIO, time, os, subprocess

GPIO.setmode(GPIO.BCM)

LED_01 = 23

class RoboControl:
	def __init__(self):
		GPIO.setup(LED_01, GPIO.OUT)
		self.reset()

	def reset(self):
	  GPIO.output(LED_01, False)

	def light(self, timer):
  		for i in range(timer):
  			GPIO.output(LED_01, True)
			time.sleep(0.5)
			GPIO.output(LED_01, False)
			time.sleep(0.5)

import RPi.GPIO as GPIO, time, os, subprocess

GPIO.setmode(GPIO.BCM)

# LED_01 = 23
BUTTON_LED = 23
BUTTON = 24

class RoboControl:
	def __init__(self):
		GPIO.setup(BUTTON_LED, GPIO.OUT)
		GPIO.setup(BUTTON, GPIO.IN)
		self.reset()

	def reset(self):
		GPIO.output(BUTTON_LED, False)

	def light(self, timer):
		while not GPIO.input(BUTTON):
				GPIO.output(BUTTON_LED, True)
				time.sleep(0.1)
				GPIO.output(BUTTON_LED, False)
				time.sleep(0.1)
		if (GPIO.input(BUTTON)):
	  		for i in range(timer):
	  			GPIO.output(LED_01, True)
				time.sleep(20)
				GPIO.output(LED_01, False)

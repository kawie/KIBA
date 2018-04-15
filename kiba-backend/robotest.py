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

	def light(self, channel):
		print "FIRED"
		GPIO.output(BUTTON_LED, True)
		time.sleep(20)
		GPIO.cleanup()

	def ready(self):
		print "READY"
		GPIO.add_event_detect(BUTTON, GPIO.RISING, callback=self.light, bouncetime=200)
		

import RPi.GPIO as GPIO, time, os, subprocess
#import testGPIO as GPIO
import time

# Raspberry GPIO setup
GPIO.setmode(GPIO.BCM)

RESET = 12
CUP_LIGHT = 25
LED_01 = 22
LED_02 = 26
LED_03 = 5
LED_04 = 6
LED_05 = 12

BUTTON_LED = 23
BUTTON = 24

REL_01 = 17
REL_02 = 4
#REL_03 = 27
#REL_04 = 18

class RoboControl:
	def __init__(self):
		GPIO.setup(RESET, GPIO.IN)
		GPIO.setup(CUP_LIGHT, GPIO.OUT)

		GPIO.setup(LED_01, GPIO.OUT)
		GPIO.setup(LED_02, GPIO.OUT)
		GPIO.setup(LED_03, GPIO.OUT)
		GPIO.setup(LED_04, GPIO.OUT)
		GPIO.setup(LED_05, GPIO.OUT)

		GPIO.setup(BUTTON_LED, GPIO.OUT)
		GPIO.setup(BUTTON, GPIO.IN)

		GPIO.setup(REL_01, GPIO.OUT)
		GPIO.setup(REL_02, GPIO.OUT)
		#GPIO.setup(REL_03, GPIO.OUT)
		#GPIO.setup(REL_04, GPIO.OUT)

		self.reset

	def reset():
	  GPIO.output(CUP_LIGHT, False)
	  GPIO.output(BUTTON_LED, False)
	  GPIO.output(REL_01, False)
	  GPIO.output(REL_02, False)

	  GPIO.output(LED_01, False)
	  GPIO.output(LED_02, False)
	  GPIO.output(LED_03, False)
	  GPIO.output(LED_04, False)
	  GPIO.output(LED_05, False)
	  print "RoboControl reset complete"

	def mixloop(self, percentage):
		while True:
			# TODO: aktivierung durch event (die website)
			while True:
				GPIO.output(BUTTON_LED, True)
				time.sleep(0.1)
				GPIO.output(BUTTON_LED, False)
				time.sleep(0.1)

				# TODO: variable x kommt von website, variable y ist feste Zeit (z.b 3.8) - x
				if (GPIO.input(BUTTON)):
					print("drinks stirred")
					GPIO.output(BUTTON_LED, True)
					GPIO.output(LED_01, True)
					time.sleep(0.2)
					GPIO.output(LED_02, True)
					GPIO.output(REL_01, True)
					# time.sleep(x)
					GPIO.output(LED_03, True)
					GPIO.output(REL_01, False)
					GPIO.output(REL_02, True)
					# time.sleep(y)
					GPIO.output(LED_04, True)
					GPIO.output(REL_02, False)
					print("drinks delivered")
					time.sleep(0.2)
					GPIO.output(LED_05, True)

				for i in range(5):
					GPIO.output(CUP_LIGHT, True)
					time.sleep(0.2)
					GPIO.output(CUP_LIGHT, False)
					time.sleep(0.2)

				GPIO.output(BUTTON_LED, False)
				GPIO.output(CUP_LIGHT, True)
				time.sleep(5)

				GPIO.output(CUP_LIGHT, False)

				GPIO.output(LED_01, False)
				GPIO.output(LED_02, False)
				GPIO.output(LED_03, False)
				GPIO.output(LED_04, False)
				GPIO.output(LED_05, False)
				time.sleep(0.1)
				print("drinks ready")

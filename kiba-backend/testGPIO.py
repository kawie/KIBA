#!/usr/bin/python
BOARD = "board"
BCM = "bcm"
OUT = "out"
IN = "in"

def output(pin, value):
  print pin, ":", value

def input(pin):
  return True

def setmode(mode):
  print mode

def setup(pin, value):
  print pin, ":", value

def cleanup():
  print "clean-up"

#End
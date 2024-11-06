// ignore_for_file: file_names
import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final IconData icon;
  final String labelText;
  final String hintText;

  const CustomTextField(
    {
      super.key,
      required this.icon,
      required this.controller,
      required this.labelText,
      required this.hintText
    });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(0.0, 20.0, 0.0, 20.0),
      child: TextField(
        controller: controller,
        keyboardType: TextInputType.text,
        style: const TextStyle(fontSize: 16.0),
        decoration: InputDecoration(
            icon: Icon(icon),
            labelText: labelText,
            hintText: hintText),
      ),
    );
  }
}

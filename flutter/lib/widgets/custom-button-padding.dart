// ignore_for_file: file_names
import 'package:flutter/material.dart';

class CustomButtonPadding extends StatelessWidget {
  final String textValue;
  const CustomButtonPadding({super.key, required this.textValue});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20.0, 0.0, 20.0, 0.0),
      child: ElevatedButton(
        onPressed: () {
          debugPrint('teste');
        },
        style: const ButtonStyle(
          backgroundColor: WidgetStatePropertyAll(Colors.white12),
          foregroundColor: WidgetStatePropertyAll(Colors.black),
        ),
        child: Text(textValue),
      ),
    );
  }
}

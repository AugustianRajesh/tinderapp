import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart';
import 'package:tinder_clone/Widgets/MatchCard.dart';

class ApiService {
  // Use localhost for web, special IP for Android emulator
  // If running on Android Emulator: 10.0.2.2
  // If running on Web: localhost
  static const String _baseUrl = 'http://localhost:3000/api';
  // static const String _baseUrl = 'http://10.0.2.2:3000/api';

  static Future<List<MatchCard>> fetchUsers() async {
    try {
      final response = await http.get(Uri.parse('$_baseUrl/users'));

      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((json) {
          // Map backend schema to MatchCard
          return MatchCard(
            json['name'] ?? 'Unknown',
            json['image_url'] ?? 'assets/images/person1.jpg',
            json['age'] ?? 18,
            json['profession'] ?? '',
            json['preferences'] ?? {},
          );
        }).toList();
      } else {
        throw Exception('Failed to load users');
      }
    } catch (e) {
      if (kDebugMode) {
        print('Error fetching users: $e');
      }
      return []; // Return empty list on error
    }
  }

  // Fetch conversation with a specific user
  static Future<List<dynamic>> fetchMessages(int otherUserId) async {
    try {
      final response = await http.get(Uri.parse('$_baseUrl/messages/$otherUserId'));
      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
         if (kDebugMode) print('Failed to load messages: ${response.statusCode}');
         return [];
      }
    } catch (e) {
      if (kDebugMode) print('Error fetching messages: $e');
      return [];
    }
  }

  // Send a message
  static Future<bool> sendMessage(int receiverId, String content) async {
    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/messages'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'receiver_id': receiverId,
          'content': content,
        }),
      );
      return response.statusCode == 200 || response.statusCode == 201;
    } catch (e) {
      if (kDebugMode) print('Error sending message: $e');
      return false;
    }
  }
}
